# Repro Repo to demonstrate unexpected 405 error in Vercel Serverless Functions

⚠️ **I am unable to reproduce the error in this repo at the moment. Still working on it.**

## Deployment links

production: <https://api-405-error-repro-nine.vercel.app/>
staging: <https://dev-api-405-error-repro-nine.vercel.app/>

This issue does not occur in local development, only in production deployment on Vercel.

## Issue description

The **api/fetchAndRelay** fails sometimes with a 405 error.

### Setup information

- pnpm as package manager
- Nextjs 13.5.6 with /pages router
- Node 20.x

## Steps to reproduce

1. Go to latest deployment
2. visit homepage
3. Open dev tools and go to network tab
4. `Trigger` button
5.1 observe 405 error
5.2 if it works fine with a 200 error => wait for 5 minutes and then repeat steps 1 to 4

### Helpers to reproduce

I have tried to isolate the issue as much as possible and this is the minimal code that was necessary in an api handler to trigger the error:

```ts
 export const config = {
  runtime: 'nodejs',
  maxDuration: 20
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = convertToGatewayUrl(
    'ipfs://bafkreihleu3xfoebp3rczwg7htgmeatinaljfb727xjbw3hnbzohtfqqhm'
  )
  console.log('fetch ipnftMetadata >. ', url)
  const ipnftMetadata: IPNFT = await (await fetch(url)).json()
  if (!ipnftMetadata) {
    throw new Error('couldnt load ipnftMetadata')
  }
  const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID as string)

  const { signature, address } = await relayerSign(
    CHAIN_ID,
    '0x15594d726c05f63142e1717e5a726a4edb96b4dcd6818fa94bebe22f05cec50e'
  )
  console.log({ signature, address })

  return res.status(200).json({
    status: 'ok',
    url
  })
}
```

You can find this under **api/fetchAndRelay**

<!-- I have created two more test apis:

api/fetchMetadata which only fetches the IPNFT Metadata : No errors here
api/relay which only triggers a signature from the relayer: No errors here
You can go to /playground/test to find three buttons that trigger those api's**

Note: It could be that I just wasn't lucky in triggering the error so far since I have observed flakiness:
Private User Image -->

Other notes:
I have tested removing axios and using fetch; no change
We have never encountered this error in our staging or production deployment. This has only started after I have added the config as described in the nextjs docs: <https://vercel.com/docs/functions/configuring-functions/duration#node.js-next.js-%3E=-13.5-or-higher-sveltekit-astro-nuxt-and-remix>
It sometimes responds with 405 errors and an execution time of about ~4s and the only available log is something like this. Only HTTP(S) protocols are supported.
Whatever I try to log or throw, it does not show up at all.
When this happens it fails for subsequent calls.
if you wait for some time and call it again then it sometimes works and then works for subsequent calls
I think what could potentially help is adding `export const dynamic = 'force-dynamic;` but i'm not too confident bc even though it always has the same input, it never hits the cache anyways.
also i'm not sure if this needs to be added to the config:

```ts
export const config = {
  runtime: 'nodejs',
  maxDuration: 20
}
```

Which is the way of configuring a serverless function for nextjs >13.5 with pages router.
or like this

```ts
export const dynamic = 'force-dynamic';
```

which is the only way that this shows up in their docs (the only explanation is actually for routes in the nextjs docs: <https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic>
the vercel docs mention it here: <https://vercel.com/docs/functions/quickstart#create-an-api-route> w/o a lot of explanation)

// trigger

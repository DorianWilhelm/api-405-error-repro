import { z } from 'zod'

import {
  AccessControlConditions,
  DecentralizedStorageLocation
} from './Common.Schema'

//todo: use the originals or link them: https://github.com/LIT-Protocol/lit-accs-validator-sdk/tree/main/src/schemas

export const BaseLocation = z.object({
  uri: z.string().describe('Unique identifier of attached file')
})

export const ResearchAgreementTypes = [
  'Sponsored Research Agreement',
  'Joint Development Agreement',
  'Patent License',
  'SAFIP'
] as const

export const AssignmentAgreementTypes = ['Assignment Agreement'] as const

export const AgreementTypes = [
  ...ResearchAgreementTypes,
  ...AssignmentAgreementTypes
] as const

// https://stackoverflow.com/questions/45251664/derive-union-type-from-tuple-array-values
export type AgreementType = typeof AgreementTypes[number]

export const AgreementTypeSchema = z
  .enum(AgreementTypes)
  .or(z.string())
  .describe('Type of Research Agreement')

export const AgreementSchema = z
  .object({
    type: AgreementTypeSchema,
    url: DecentralizedStorageLocation,
    mime_type: z.string().describe('Mime type of the file that is attached'),
    content_hash: z
      .string()
      .describe('a CID encoded content hash to verify file integrity'),
    encryption: z
      .object({
        protocol: z.literal('lit'),
        encrypted_sym_key: z
          .string()
          .describe(
            'This key needs to be passed to the lit nodes by the owner for decryption'
          ),
        access_control_conditions: AccessControlConditions
      })
      .optional()
  })
  .describe(
    'agreements are documents that back IP in the real world (e.g. paper contracts)'
  )
  .strict()

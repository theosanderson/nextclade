import { omit } from 'lodash'
import jsonexport from 'jsonexport'

import type { AnalysisResult } from 'src/algorithms/types'
import { formatAAMutation, formatMutation } from 'src/helpers/formatMutation'
import { formatRange } from 'src/helpers/formatRange'
import { formatInsertion } from 'src/helpers/formatInsertion'
import { formatNonAcgtn } from 'src/helpers/formatNonAcgtn'
import { StrictOmit } from 'ts-essentials'

export type Exportable = StrictOmit<AnalysisResult, 'alignedQuery'>

export function prepareResultJson(result: AnalysisResult): Exportable {
  return omit(result, ['alignedQuery'])
}

export function prepareResultCsv(datum: Exportable) {
  return {
    ...datum,
    substitutions: datum.substitutions.map((mut) => formatMutation(mut)).join(','),
    aminoacidChanges: datum.aminoacidChanges.map((mut) => formatAAMutation(mut)).join(','),
    deletions: datum.deletions.map(({ start, length }) => formatRange(start, start + length)).join(','),
    insertions: datum.insertions.map((ins) => formatInsertion(ins)).join(','),
    missing: datum.missing.map(({ begin, end }) => formatRange(begin, end)).join(','),
    nonACGTNs: datum.nonACGTNs.map((nacgtn) => formatNonAcgtn(nacgtn)).join(','),
  }
}

export async function toCsvString(data: Array<unknown> | Record<string, unknown>, delimiter: string) {
  return jsonexport(data, { rowDelimiter: delimiter, endOfLine: '\r\n' })
}

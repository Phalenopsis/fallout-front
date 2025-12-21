import { ORIGINE_FIELD_MAPPINGS } from './field-mapping.model';
import { ViewOriginDetailModel } from './origin-detail/view-origin-detail.model';
import { OrigineDescription } from './origine.desc';

export function createOriginViewModelsDeclarative(
  origine: OrigineDescription,
): ViewOriginDetailModel[] {
  const result: ViewOriginDetailModel[] = [];

  for (const mapping of ORIGINE_FIELD_MAPPINGS) {
    const value = origine[mapping.key];
    if (value == null || !mapping.transform) continue;

    const description = mapping.transform(value);
    if (!description.length) continue;

    result.push({
      label: mapping.label,
      description,
    });
  }

  return result;
}

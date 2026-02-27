import { ErrorValidation } from "../../responses/default/error.response";

export function getErrorValidationMessage(field: string, errors?: ErrorValidation[]) {
    const error = errors?.find(x => x.field == field)
    return error?.message
}

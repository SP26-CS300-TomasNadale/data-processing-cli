import Joi from "joi";

export const validateCountryInput = (options) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required()
  });

  const { error, value } = schema.validate(options);

  if (error) {
    throw new Error(`Validation Error: ${error.message}`);
  }

  return value;
};
export const validateRepoInput = (data) => {
  const schema = Joi.object({
    owner: Joi.string().min(1).required(),
    repo: Joi.string().min(1).required(),
    save: Joi.boolean().optional()
  });

  const { error, value } = schema.validate(data);

  if (error) {
    throw new Error(`Validation Error: ${error.details[0].message}`);
  }

  return value;
};
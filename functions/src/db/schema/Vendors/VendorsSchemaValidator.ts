const Joi = require('@hapi/joi');

const vendorSchema = Joi.object({
  profile: Joi.object({
    name: Joi.object({
      first: Joi.string().required(),
      last: Joi.string().required(),
    }).required(),
    access: Joi.object({
      email: Joi.string().email().required(),
    }).required(),
  }).required(),
  businessEntity: Joi.object({
    entityName: Joi.string().min(3).required(),
    location: Joi.object({
      city: Joi.string().required(),
      state: Joi.string().required().min(2),
      streetAddr: Joi.string().required(),
      zipCode: Joi.number().min(4).max(4).required(),
    }).required(),
  }).required(),
});

export default vendorSchema;

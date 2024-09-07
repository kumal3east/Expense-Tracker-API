import vine from '@vinejs/vine'

export const createValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1),
    amount: vine.number().min(0.01),
    date_of_expense: vine
      .string()
      .regex(new RegExp('^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$')),
    category: vine.string().minLength(1),
    notes: vine.string().optional(),
  })
)

export const readValidator = vine.compile(
  vine.object({
    page: vine.number().withoutDecimals().positive(),
    limit: vine.number().withoutDecimals().positive(),
    start_date: vine
      .string()
      .regex(new RegExp('^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$'))
      .optional()
      .requiredIfExists('end_date'),
    end_date: vine
      .string()
      .regex(new RegExp('^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$'))
      .optional()
      .requiredIfExists('start_date'),
    category: vine.string().optional(),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const expense = await db.from('expenses').where('id', value).first()
      return expense
    }),
    title: vine.string().optional(),
    amount: vine.number().optional(),
    date_of_expense: vine.date({ formats: ['DD-MM-YYYY', 'x'] }).optional(),
    category: vine.string().optional(),
    notes: vine.string().optional(),
  })
)

export const deleteValidator = vine.compile(
  vine.object({
    id: vine.number().exists(async (db, value) => {
      const expense = await db.from('expenses').where('id', value).first()
      return expense
    }),
  })
)

export const reportValidator = vine.compile(
  vine.object({
    start_date: vine
      .string()
      .regex(new RegExp('^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$')),
    end_date: vine
      .string()
      .regex(new RegExp('^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$')),
  })
)

import vine from '@vinejs/vine'

export const createValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1),
    amount: vine.number().min(0.01),
    date_of_expense: vine.date({ formats: ['DD-MM-YYYY', 'x'] }),
    category: vine.string().minLength(1),
    notes: vine.string().optional(),
  })
)

export const readValidator = vine.compile(
  vine.object({
    start_date: vine
      .date({ formats: ['DD-MM-YYYY', 'x'] })
      .optional()
      .requiredIfExists('end_date'),
    end_date: vine
      .date({ formats: ['DD-MM-YYYY', 'x'] })
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
      return !expense
    }),
  })
)

export const reportValidator = vine.compile(
  vine.object({
    start_date: vine.date({ formats: ['DD-MM-YYYY', 'x'] }),
    end_date: vine.date({ formats: ['DD-MM-YYYY', 'x'] }),
  })
)

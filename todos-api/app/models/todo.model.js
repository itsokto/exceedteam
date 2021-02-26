module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      isDone: Boolean,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
    { timestamps: true }
  );

  schema.set("toJSON", { virtuals: true, versionKey: false });

  const Todo = mongoose.model("todo", schema);

  return Todo;
};

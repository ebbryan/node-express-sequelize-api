export function CustomMiddleware(app) {
  // Middleware to handle errors
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  // Middleware to handle 404 errors
  app.use((req, res, next) => {
    res.status(404).send("Not Found");
  });
}

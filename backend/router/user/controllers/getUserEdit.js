import { connection } from "../../models/db.js";

export const getUserEdit = (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM usuarios WHERE id =?", 
    [id], 
    (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

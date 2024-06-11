import { connection } from '../../../models/db.js'

export const getEditBook = (req, res) =>{
    const id = req.params.id
    connection.query(
        'SELECT * FROM libros WHERE id =?', 
        [id], 
        (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({
                message: 'Error en la consulta'
            })
            return
        }
        else{
            res.status(200).json(result)
            return
            
        }
    })
}
import {pool} from "../db.js"

//Lógica (backend) de cada endpoint
export const getPeliculas = async(req, res) => {
  const [rows] = await pool.query('SELECT * FROM peliculas')
  res.json(rows)
}

export const getPeliculaById = async(req, res) => {
  const [rows] = await pool.query('SELECT * FROM peliculas WHERE id = ?', [req.params.id])
  
  if(rows.length <= 0) return res.status(404).json({
    message: 'No existe la pelicula con este ID'
  })

  res.json(rows)
}

export const createPeliculas = async (req, res) => {
  //1. Obtener los datos del body
  const {titulo,duracionmin,clasificacion,alanzamiento} = req.body

  //2. Ejecutar la consulta SQL, pasa valores obtenidos del body
  const [rows] = await pool.query('INSERT INTO peliculas (titulo,duracionmin,clasificacion,alanzamiento) VALUES (?,?,?,?)', 
  [titulo,duracionmin,clasificacion,alanzamiento])

  //3. Enviar un objeto con el resultado del query
  res.send({
    id: rows.insertId,
    titulo,
    duracionmin,
    clasificacion,
    alanzamiento
  })
}

export const updatePeliculas = async (req, res) => {
  const id = req.params.id
  const {titulo,duracionmin,clasificacion,alanzamiento} = req.body
  
  const querySQL =`
  UPDATE peliculas SET
    titulo = ?,
    duracionmin = ?,
    clasificacion = ?,
    alanzamiento = IFNULL(?,'')
  WHERE id = ?
  `
  const [result] = await pool.query(querySQL, [titulo,duracionmin,clasificacion,alanzamiento,id])

  if (result.affectedRows == 0) return res.status(404).json({
    message: 'El ID no existe'
  })
   
  res.json({message: 'Pelicula actualizada correctamente'})
}

export const deletePeliculas = async(req, res) => {
  const [result] = await pool.query('DELETE FROM peliculas WHERE id = ?', [req.params.id])
  if (result.affectedRows <= 0) return res.status(404).json({
    message: 'No existe la pelicula con este ID'
  })

  //¿Y si borra correctamente?
  res.sendStatus(204)
}
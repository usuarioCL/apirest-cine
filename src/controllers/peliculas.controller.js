import {pool} from "../db.js"

//Lógica (backend) de cada endpoint
export const getPeliculas = async(req, res) => {
  try {
    //1. Ejecutar la consulta SQL
    const [rows] = await pool.query('SELECT * FROM peliculas')
    //2. Enviar un objeto con el resultado del query
    res.json(rows)
  }catch (error) {
    //3. Manejar errores
    return res.status(500).json({
      message: 'Error al obtener las peliculas',
      error: error.message
    })
  }
}

export const getPeliculaById = async(req, res) => {
  try {
    //1. Obtener el ID de la pelicula
    const id = req.params.id
    //2. Ejecutar la consulta SQL
    const [rows] = await pool.query('SELECT * FROM peliculas WHERE id = ?', [id])
    //3. Si no existe la pelicula, enviar un error 404
    if (rows.length <= 0) return res.status(404).json({
      message: 'No existe la pelicula con este ID'
    })
    //4. Enviar un objeto con el resultado del query
    res.json(rows[0])
  }catch (error) {
    //5. Manejar errores
    return res.status(500).json({
      message: 'Error al obtener la pelicula',
      error: error.message
    })
  }
}

export const createPeliculas = async (req, res) => {
  try {
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
  } catch (error) {
    //4. Manejar errores
    return res.status(500).json({
      message: 'Error al crear la pelicula',
      error: error.message
    })
  }

}

export const updatePeliculas = async (req, res) => {
  try {
  //1. Obtener el ID de la pelicula
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
  } catch (error) {
    //4. Manejar errores
    return res.status(500).json({
      message: 'Error al actualizar la pelicula',
      error: error.message
    })
  }
}

export const deletePeliculas = async(req, res) => {
  try {
  const [result] = await pool.query('DELETE FROM peliculas WHERE id = ?', [req.params.id])
  if (result.affectedRows <= 0) return res.status(404).json({
    message: 'No existe la pelicula con este ID'
  })

  //¿Y si borra correctamente?
  res.sendStatus(204)
  }catch (error) {
    //4. Manejar errores
    return res.status(500).json({
      message: 'Error al eliminar la pelicula',
      error: error.message
    })
  }
}
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const listaDefault = [
  "a",
  "b",
  "c",
  "d",
  "e",
]

function App() {
   // let contador = 0;
   const [contador, setContador] = useState(0);
   const [lista, setLista] = useState<string[]>([]);
   const [lista2, setlista2] = useState<string[]>([]);
   const [todo, setTodo] = useState("");
   const [filterByDesc, setFilterBydesc] = useState<string>("");
   const [filterByNroTarea, setFilterByNroTarea]=useState<number>(0);
   // useEffect
   useEffect(() => {
     let resultadoBusqueda = lista2;
     if (filterByDesc!=='') {
      resultadoBusqueda = resultadoBusqueda.filter((item, i) => item.includes(filterByDesc))
     }

     if (filterByNroTarea>0) {
      resultadoBusqueda = resultadoBusqueda.filter((item, i) => i === filterByNroTarea-1)
     }

     if (resultadoBusqueda.length>0) {
      setLista(resultadoBusqueda) 
     }else{
      if (lista2.length > 0) {
        toast.error("No se ha encontrado el registro");
        setLista(lista2)  
      }else{
        setLista(listaDefault) // inicializo mi render lista
        setlista2(listaDefault) //Inicializado mi lista
      }
     }
     
   }, [filterByDesc,filterByNroTarea]);

   const sumar = () => {
     setContador(contador + 1);
   };

   const agregarALista = (param: string) => {
     if (param==='') {
       toast.error("Debe ingresar una descripción a la tarea")
     }else{
       setLista([...lista,todo]);
       setlista2([...lista2,todo])
       setTodo('');
       toast.success("Tarea agregada correctamente")
     }
   };

   const eliminar = (index: number) => {
     setLista(lista.filter((item, i) => i !== index));
     toast.info("Tarea eliminada correctamente")
   };
 
   return (
     <div className="App">
       {/* mision aprender sobre useEffect y useState */}
       

       <Container maxWidth="sm">
         <Box sx={{ bgcolor: '#f7f7f7', border:'1px solid #e6e6e6'}} padding={2}>
         <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Slide}
          />

         <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
         <Typography gutterBottom variant='h3' fontWeight={"bold"}>Lista de Tareas</Typography>
         <TextField id="task-input" value={todo} label="Nueva Tarea" variant="outlined" placeholder='Nombre de Tarea' fullWidth onChange={
           (e)=>setTodo(e.target.value)
         }/>
         <Button variant="contained" fullWidth onClick={() => agregarALista(todo)}>Agregar a la lista</Button>
         <Typography gutterBottom variant='h5' fontWeight={"bold"}>Tareas Programadas</Typography>
         <TextField id="task-filterByDesc-input" value={filterByDesc} label="Buscar por descripción" variant="outlined" placeholder='Descripción de tarea' fullWidth
         onChange={(e)=>setFilterBydesc(e.target.value)}
         />
         <TextField id="task-filterById-input" value={filterByNroTarea} label="Buscar por nro. tarea" variant="outlined" placeholder='Ingrese nro. de tarea' fullWidth
         onChange={(e)=>setFilterByNroTarea(Number(e.target.value))}/>
         </Stack>
           {
             lista.map((item, index) => (
             <div>
               <List>
                   <ListItem disablePadding divider key={index} secondaryAction={
                     <IconButton onClick={()=>eliminar(index)}><DeleteIcon/></IconButton>
                   }>
                     <ListItemText primary={
                          <Typography gutterBottom sx={{fontSize:"1.4em"}}>{
                            item
                          }</Typography>} />
                   </ListItem>
               </List>
             </div>
           ))}
         </Box>
       </Container>  
     </div>
   );
}

export default App;

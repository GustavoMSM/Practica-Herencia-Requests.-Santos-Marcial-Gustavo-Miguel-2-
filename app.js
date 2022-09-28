const express = require('express');
const app = express();
const fs = require("fs");
const { cursorTo } = require('readline');
const data = require("./Estudiantes.json");
const port = 4000;

const currentFile = '${currentDir}Estudiantes.json';


app.get('/api/v1/Estudiantes', function(req, res) {
    const rawData = fs.readFileSync(currentFile);
    const response = JSON.parse(rawData)
    res.json({data: response});
});

app.get('/api/v1/Estudiantes/:matricula', function(req, res) {
    const matricula = req.params.matricula;
    const rawData = fs.readFileSync(currentFile);
    const jsonFile = JSON.parse(rawData);
    const response = jsonFile.find(u => u.matricula === + matricula);
    res.json({data: response});
});

app.get('/api/v1/search', function(req, res) {
    const matricula = req.query.matricula;
    const Materias = req.query.Materias;
    const rawData = fs.readFileSync(currentFile);
    const jsonFile = JSON.parse(rawData);
    const response = jsonFile.filter(u =>{
        if(+u.matricula === +matricula) return true;
    });
    res.json({data: response});
});

app.post('/Estudiantes', function(req, res) {
    const currentData = data;
    const response = {error:false, msg:"La cuenta se creo con exito",data: null};
    if(req.body.Nombre && req.body.ApellidoP && req.body.ApellidoM && req.body.Carrera && req.body.Cuatrimestre && req.body.Turno && req.body.Materias){
        const dataSave = {
        Matricula: req.body.Matricula,
        Nombre: req.body.Nombre,
        ApellidoP: req.body.ApellidoP,
        ApellidoM: req.body.ApellidoM,
        Carrera: req.body.Carrera,
        Cuatrimestre: req.body.Cuatrimestre,
        Turno: req.body.Turno,
        Materias: req.body.Materias
    };
    currentData.push(dataSave);
    fs.writeFile("./Estudiantes.json/",JSON.stringify(currentData),(err ) =>{
    response.error = ture;
    response.msg = "Server error";
    });
    response.data = dataSave;
    }else{
        response.error = true;
        response.msg = "Invalid data";
    }
    ResizeObserver.json(Response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

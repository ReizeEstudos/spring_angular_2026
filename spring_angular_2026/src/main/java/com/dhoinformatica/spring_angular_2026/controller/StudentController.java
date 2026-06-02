package com.dhoinformatica.spring_angular_2026.controller;

import org.springframework.web.bind.annotation.RestController;

import com.dhoinformatica.spring_angular_2026.entities.Student;
import com.dhoinformatica.spring_angular_2026.repository.StudentRepository;

import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URI;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/students")
public class StudentController {

    @Autowired
    private StudentRepository repository;

    @GetMapping("/list")
    public ResponseEntity<Iterable<Student>> findAll() {
        return ResponseEntity.ok(repository.findAll());
    }   

    //quando não sei qual pode ser o retorno, usar o ?
    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody Student entity) {
        
        if(entity.getName() == null || entity.getName().isEmpty()){
            return ResponseEntity.badRequest().body("Informe um nome válido!");
        }

        if(entity.getGrade1() < 0 || entity.getGrade1() > 10 || 
        entity.getGrade1() < 0 || entity.getGrade1() > 10){
            return ResponseEntity.badRequest().body("Nota inválida");
        }

        Student newStudent = repository.save(entity);
        URI uri = URI.create("api/students/" + newStudent.getId());
        return ResponseEntity.created(uri).body(newStudent);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable UUID id) {
        if(!repository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(repository.findById(id));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody Student entity) {
        
        if(!repository.existsById(id)){
            return ResponseEntity.notFound().build();//o .build finaliza o ResponseEntity
        }
        if(entity.getName() == null || entity.getName().isEmpty()){
            return ResponseEntity.badRequest().body("Informe um nome válido!");
        }

        if(entity.getGrade1() < 0 || entity.getGrade1() > 10 || 
        entity.getGrade1() < 0 || entity.getGrade1() > 10){
            return ResponseEntity.badRequest().body("Nota inválida");
        }
        
        entity.setId(id);
        return ResponseEntity.ok(repository.save(entity));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id){
        if(!repository.existsById(id)){
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.ok().build();
    } 
}

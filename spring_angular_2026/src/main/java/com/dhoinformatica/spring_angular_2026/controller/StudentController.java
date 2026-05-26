package com.dhoinformatica.spring_angular_2026.controller;

import org.springframework.web.bind.annotation.RestController;

import com.dhoinformatica.spring_angular_2026.entities.Student;
import com.dhoinformatica.spring_angular_2026.repository.StudentRepository;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
@RequestMapping("api/students")
public class StudentController {

    @Autowired
    private StudentRepository repository;

    @GetMapping("/list")
    public Iterable<Student> findAll() {
        return repository.findAll();
    }
    

    @PostMapping("/insert")
    public Student insert(@RequestBody Student entity) {
        return repository.save(entity);
    }

    @PutMapping("update/{id}")
    public Student putMethodName(@PathVariable UUID id, @RequestBody Student student) {
        student.setUuid(id);
        return repository.save(student);
    }
    
    
}

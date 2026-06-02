package com.dhoinformatica.spring_angular_2026.controller;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhoinformatica.spring_angular_2026.dto.FollowUpDTO;
import com.dhoinformatica.spring_angular_2026.entities.FollowUp;
import com.dhoinformatica.spring_angular_2026.entities.Student;
import com.dhoinformatica.spring_angular_2026.repository.FollowUpRepository;
import com.dhoinformatica.spring_angular_2026.repository.StudentRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("api/followups")
public class FollowUpController {

    @Autowired
    private FollowUpRepository repository;

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody FollowUpDTO dto){
        if(dto.getText() == null || dto.getText().isEmpty()){
            return ResponseEntity.badRequest().body("Informe um Texto!");
        }

        if(dto.getDate() == null){
            return ResponseEntity.badRequest().body("Data inválida!");
        }

        Optional<Student> student = studentRepository.findById(dto.getStudentId());

        if(student.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        //Extrai o aluno dentro da optional com segurança
        Student entity = student.get();

        FollowUp followUp = new FollowUp();
        followUp.setDate(dto.getDate());
        followUp.setText(dto.getText());
        followUp.setStudent(entity);

        FollowUp newFollowUp = repository.save(followUp);

        URI uri = URI.create("api/students/" + newFollowUp.getId());

        return ResponseEntity.created(uri).body(newFollowUp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable UUID id) {
        if(!repository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(repository.findById(id));
    }

    @GetMapping("/list")
    public ResponseEntity<Iterable<FollowUp>> findAll() {
        return ResponseEntity.ok(repository.findAll());
    }
    
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id){
        if(!repository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

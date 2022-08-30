package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Grupa;
import rva.jpa.Student;
import rva.repository.GrupaRepository;
import rva.repository.StudentRepository;

@RestController
@Api(tags = { "Student CRUD operacije" })
public class StudentRestController {

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private GrupaRepository grupaRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@GetMapping("student")
	public Collection<Student> getStudent() {
		return studentRepository.findAll();
	}

	@GetMapping("student/{id}")
	@ApiOperation(value = "Vraca kolekciju svih smerova iz baze podataka.:)")
	public ResponseEntity<Student> getStudent(@PathVariable("id") Integer id) {
		Student student = studentRepository.getOne(id);
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}

	@GetMapping("studentZaGrupaId/{grupa}")
	@ApiOperation(value = "Vraca studenta iz baze podataka ciji je id proslijedjen kao path varijabla.:)")
	public Collection<Student> studentPoGrupiId(@PathVariable("grupa") int id) {
		Grupa g = grupaRepository.getOne(id);
		return studentRepository.findByGrupa(g);
	}

	@GetMapping("student/{brojIndeksa}")
	@ApiOperation(value = "Vraca kolekciju studenata koji u nazivu sadrze string proslijedjen kao path varijabla.:)")
	public Collection<Student> getStudentBrojIndeksa(@PathVariable("brojIndeksa") String brojIndeksa) {
		return studentRepository.findByBrojIndeksaContainingIgnoreCase(brojIndeksa);
	}

	@PostMapping("student")
	@CrossOrigin 
	@ApiOperation(value = "Dodaje studenta u bazu podataka.:)")
	public ResponseEntity<Student> insertStudent(@RequestBody Student student) {
		if (!studentRepository.existsById(student.getId())) {
			studentRepository.save(student);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}

	@PutMapping("student")
	@CrossOrigin 
	@ApiOperation(value = "Azurira studenta u bazi podataka.:)")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
		if (!studentRepository.existsById(student.getId()))
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		studentRepository.save(student);
		return new ResponseEntity<Student>(HttpStatus.OK);

	}

	@DeleteMapping("student/{id}")
	@CrossOrigin 
	@ApiOperation(value = "Brise studenta iz baze podataka.:)")
	public ResponseEntity<Student> deleteStudent(@PathVariable("id") Integer id) {
		if (!studentRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		studentRepository.deleteById(id);
		if (id == -100)
			jdbcTemplate.execute(
					"insert into \"student\"(\"id\",\"ime\",\"prezime\",\"broj_indeksa\",\"grupa\",\"projekat\")\r\n"
							+ "values (-100,'Aska','Vuk','23/2018',1,4)");
		return new ResponseEntity<>(HttpStatus.OK);
	}

}

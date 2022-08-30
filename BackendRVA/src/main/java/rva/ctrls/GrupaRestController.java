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
import rva.repository.GrupaRepository;

@RestController
@Api(tags = { "Grupa CRUD operacije" })
public class GrupaRestController {

	@Autowired
	private GrupaRepository grupaRepository;

	@GetMapping("grupa")
	@ApiOperation(value = "Vraca kolekciju svih grupa iz baze podataka.:)")
	public Collection<Grupa> getGrupe() {
		return grupaRepository.findAll();
	}

	@GetMapping("grupa/{id}")
	@ApiOperation(value = "Vraca grupu iz baze podataka ciji je id proslijedjen kao path varijabla.:)")
	public Grupa getGrupe(@PathVariable("id") Integer id) {
		return grupaRepository.getOne(id);
	}

	@GetMapping("grupaOznaka/{oznaka}")
	@ApiOperation(value = "Vraca kolekciju grupa koji u nazivu sadrze string proslijedjen kao path varijabla.:)")
	public Collection<Grupa> getGrupaByOznaka(@PathVariable("oznaka") String oznaka) {
		return grupaRepository.findByOznakaContainingIgnoreCase(oznaka);
	}

	@PostMapping("grupa")
	@CrossOrigin 
	@ApiOperation(value = "Dodaje grupu u bazu podataka.:)")
	public ResponseEntity<Grupa> insertGrupa(@RequestBody Grupa grupa) {
		if (!grupaRepository.existsById(grupa.getId())) {
			grupaRepository.save(grupa);
			return new ResponseEntity<Grupa>(HttpStatus.OK);
		}
		return new ResponseEntity<Grupa>(HttpStatus.CONFLICT);
	}



	@PutMapping("grupa")
	@CrossOrigin 
	@ApiOperation(value = "Azurira grupu u bazi podataka.:)")
	public ResponseEntity<Grupa> updateGrupa(@RequestBody Grupa grupa) {
		if (!grupaRepository.existsById(grupa.getId()))
			return new ResponseEntity<Grupa>(HttpStatus.NO_CONTENT);
		grupaRepository.save(grupa);
		return new ResponseEntity<Grupa>(HttpStatus.OK);
	}

	@DeleteMapping("grupa/{id}")
	@CrossOrigin 
	@ApiOperation(value = "Brise grupu iz baze podataka.:)")
	public ResponseEntity<Grupa> deleteGrupa(@PathVariable("id") Integer id) {
		if (!grupaRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		grupaRepository.deleteById(id);
		if (id == -101)
			jdbcTemplate.execute("insert into \"grupa\"(\"id\",\"oznaka\",\"smer\")\r\n" + "values (-100,'druga',1)");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Autowired
	private JdbcTemplate jdbcTemplate;

}

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
import rva.jpa.Smer;
import rva.repository.SmerRepository;

@RestController
@Api(tags = { "Smer CRUD operacije" })
public class SmerRestController {

	@Autowired
	private SmerRepository smerRepository;

	@GetMapping("smer")
	@ApiOperation(value = "Vraca kolekciju svih smerova iz baze podataka.:)")
	public Collection<Smer> getSmerovi() {
		return smerRepository.findAll();
	}

	@GetMapping("smer/{id}")
	@ApiOperation(value = "Vraca smer iz baze podataka ciji je id proslijedjen kao path varijabla.:)")
	public Smer getSmer(@PathVariable("id") Integer id) {
		return smerRepository.getOne(id);
	}

	@GetMapping("smer/{naziv}")
	@ApiOperation(value = "Vraca kolekciju smerova koji u nazivu sadrze string proslijedjen kao path varijabla.:)")
	public Collection<Smer> getSmerByNaziv(@PathVariable("naziv") String naziv) {
		return smerRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("smer")
	@CrossOrigin 
	@ApiOperation(value = "Dodaje smer u bazu podataka.:)")
	public ResponseEntity<Smer> insertSmer(@RequestBody Smer smer) {
		if (!smerRepository.existsById(smer.getId())) {
			smerRepository.save(smer);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}

	@PutMapping("smer")
	@CrossOrigin 
	@ApiOperation(value = "Azurira smer u bazi podataka.:)")
	public ResponseEntity<Smer> udpateSmer(@RequestBody Smer smer) {
		if (!smerRepository.existsById(smer.getId()))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		smerRepository.save(smer);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("smer/{id}")
	@CrossOrigin 
	@ApiOperation(value = "Brise smer iz baze podataka.:)")
	public ResponseEntity<Smer> deleteSmer(@PathVariable("id") Integer id) {
		if (!smerRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		smerRepository.deleteById(id);
		if (id == -100)
			jdbcTemplate.execute("INSERT INTO \"smer\"(\"id\", \"naziv\", \"oznaka\") \r\n"
					+ "VALUES (-100, 'naziv test', 'oznaka test'); ");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@Autowired
	private JdbcTemplate jdbcTemplate;

}

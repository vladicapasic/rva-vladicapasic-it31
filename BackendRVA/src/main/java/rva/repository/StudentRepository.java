package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rva.jpa.Grupa;
import rva.jpa.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	Collection<Student> findByGrupa(Grupa g);

	Collection<Student> findByBrojIndeksaContainingIgnoreCase(String brojIndeksa);

	@Query(value = "select coalesce(max(projekat)+1, 1) from student where grupa = ?1", nativeQuery = true)
	Integer nextRBr(Integer studentID);

}

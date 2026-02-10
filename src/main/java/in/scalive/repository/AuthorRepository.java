package in.scalive.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.scalive.entity.Author;

public interface AuthorRepository extends JpaRepository <Author, Long> {
	
	 boolean existsByEmail(String Email);
	 Optional <Author> findByEmail(String email);
	 
}

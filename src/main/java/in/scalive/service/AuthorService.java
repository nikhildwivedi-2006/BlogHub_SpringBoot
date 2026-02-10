package in.scalive.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.scalive.dto.AuthorUpdateDTO;
import in.scalive.entity.Author;
import in.scalive.exception.ResourceNotFoundException;
import in.scalive.repository.AuthorRepository;

@Service
public class AuthorService {
	private AuthorRepository authRepo;

	@Autowired
	public AuthorService(AuthorRepository authRepo) {	
		this.authRepo = authRepo;
	}
	
	public List<Author> getAllUsers(){
		return authRepo.findAll();
	}
	
	public Author getUserById(long id){
		Author author = authRepo.findById(id).orElse(null);
		if(author == null) {
			throw new ResourceNotFoundException("No author with id :"+ id +"found");
		}
		return author;
	}
	
	//update author method
	public Author updateUser(Long id , AuthorUpdateDTO updAuthor) {
		Author author = getUserById(id);
		if(updAuthor.getName()==null && updAuthor.getEmail()== null && updAuthor.getAbout()==null) {
			throw new RuntimeException("Empty objects not Allowed");
		}
		
		if(updAuthor.getName()!=null && updAuthor.getName().isBlank()) {
			throw new RuntimeException("Name cannot be blank ");
		}
		
		if(updAuthor.getAbout()!=null && updAuthor.getAbout().isBlank()) {
			throw new RuntimeException("About cannot be blank ");
		}
		
		if(updAuthor.getName()!=null) {
			author.setName(updAuthor.getName());
		}
		
		if(updAuthor.getAbout()!=null) {
			author.setAbout(updAuthor.getAbout());
		}
		if(updAuthor.getEmail()!=null) {
			author.setEmail(updAuthor.getEmail());
		}
		return authRepo.save(author);
	}
	
	//delete method of author 
	public void deleteUser(Long id) {
		Author author = getUserById(id);
		authRepo.delete(author);
	}
}

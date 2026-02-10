package in.scalive.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.scalive.dto.AuthorResponseDTO;
import in.scalive.dto.AuthorUpdateDTO;
import in.scalive.entity.Author;
import in.scalive.service.AuthorService;


@RestController
@RequestMapping("/api/users")
public class AuthorController {
	private AuthorService authServ;

	@Autowired
	public AuthorController(AuthorService authServ) {

		this.authServ = authServ;
	}
	
	// get user method
	@GetMapping("/{id}")
	public ResponseEntity<AuthorResponseDTO>getUserById(@PathVariable Long id){
		Author author = authServ.getUserById(id);
		AuthorResponseDTO  authorResponse = new AuthorResponseDTO(id, author.getName(), author.getEmail(), author.getRole(), author.getAbout());
		return ResponseEntity.ok(authorResponse);
	}
	
	//update user method
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id , @RequestBody AuthorUpdateDTO authUpdate , @RequestAttribute("currentUserId")Long currentUserId , @RequestAttribute("currentUserRole")String currentUserRole  ){
		
		if(!id.equals(currentUserId)&&(!currentUserRole.equals("ADMIN"))) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("{\"error\" : you can update only your profile\"}");
		}
		
		Author updatedAuthor = authServ.updateUser(id, authUpdate);
		AuthorResponseDTO  respDTO = new AuthorResponseDTO(updatedAuthor.getId() , updatedAuthor.getName() , updatedAuthor.getEmail() , updatedAuthor.getRole() , updatedAuthor.getAbout());
		
		return ResponseEntity.ok(respDTO);
	}
	
	// get all user method 
	
	@GetMapping
	public ResponseEntity<List <AuthorResponseDTO>> getAllUsers(){
		List <Author> authorList = authServ.getAllUsers();
		List <AuthorResponseDTO> respList = new ArrayList<>();
		
		for(Author author: authorList) {
			AuthorResponseDTO  respDTO = new AuthorResponseDTO(author.getId() , author.getName() , author.getEmail() , author.getRole() , author.getAbout());
			respList.add(respDTO);
		}
		return ResponseEntity.ok(respList);
	}
	
	//delete user method 
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id , @RequestAttribute("currentUserId")Long currentUserId , @RequestAttribute("currentUserRole")String currentUserRole ){
		if(!id.equals(currentUserId)&&(!currentUserRole.equals("ADMIN"))) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("{\"error\" : you can delete only your profile\"}");
		}
		authServ.deleteUser(id);
		return ResponseEntity.ok("User deleted successfully");
	}
}

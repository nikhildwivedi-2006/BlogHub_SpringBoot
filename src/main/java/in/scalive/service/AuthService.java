package in.scalive.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.scalive.dto.AuthResponseDTO;
import in.scalive.dto.LoginRequestDTO;
import in.scalive.dto.RegisterRequestDTO;
import in.scalive.entity.Author;
import in.scalive.exception.ResourceAlreadyExistsException;
import in.scalive.exception.ResourceNotFoundException;
import in.scalive.repository.AuthorRepository;
import jakarta.servlet.http.HttpSession;
@Service
public class AuthService {
	private AuthorRepository authRepo;

	@Autowired
	public AuthService(AuthorRepository authRepo) {

		this.authRepo = authRepo;
	}

	// 1. register method 
	
	public AuthResponseDTO register(RegisterRequestDTO req) {
		// Step 1: check if email already exists or not
		if (authRepo.existsByEmail(req.getEmail())) {
			throw new ResourceAlreadyExistsException("Email already Registered");

		}

		// step 2 convert DTO into Entity
		Author author = new Author();
		author.setName(req.getName());
		author.setEmail(req.getEmail());
		author.setPassword(req.getPassword());
		author.setAbout(req.getAbout());
		author.setRole("USER");

		// step 3 saved the entity
		Author savedAuthor = authRepo.save(author);

		// step 4 Return back the response
		return (new AuthResponseDTO(savedAuthor.getId(), savedAuthor.getName(), savedAuthor.getEmail(),
				savedAuthor.getRole(), "Registration Successful"));

	}
// 2. Login  method 
	public AuthResponseDTO login(LoginRequestDTO req, HttpSession session) {
		// Step 1: check if email already exists or not

		Author author = authRepo.findByEmail(req.getEmail()).orElse(null);

		if (author == null) {
			throw new ResourceNotFoundException("Invalid Userid or Password");
		}
		if (!author.getPassword().equals(req.getPassword())) {
			throw new ResourceNotFoundException("Invalid UserId or Password");
		}

		session.setAttribute("userId" , author.getId());
		session.setAttribute("userRole" , author.getRole());
		session.setAttribute("userName" , author.getName());
		session.setAttribute("userEmail", author.getEmail());
		 
		return (new AuthResponseDTO(
				author.getId(),
				author.getName(),
				author.getEmail(),
				author.getRole(), "Login Successful"));
	}
	
	// 3. logout method
	public void logout(HttpSession session) {
		session.invalidate();
	}
	
	// 4. method of return current user information
	
	public AuthResponseDTO getCurrentUser(HttpSession session) {
		Long userId =(Long)session.getAttribute("userId");//get attribute method takes String and return object so we can do it downcast
		
		if(userId==null) { // means session timeout will happen 
			throw new ResourceNotFoundException("No User Logged in");
		}
		      // else user present
		String userName = (String)session.getAttribute("userName");
		String userEmail = (String)session.getAttribute("userEmail");
		String userRole = (String)session.getAttribute("userRole");
		
		return new AuthResponseDTO (userId , userName , userEmail , userRole , "current User Data");
		
	}// it is done now 
}

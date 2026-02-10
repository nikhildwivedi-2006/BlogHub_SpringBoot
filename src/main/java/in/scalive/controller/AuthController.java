package in.scalive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.scalive.dto.AuthResponseDTO;
import in.scalive.dto.LoginRequestDTO;
import in.scalive.dto.RegisterRequestDTO;
import in.scalive.service.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private AuthService serv;
	
	@Autowired
	public AuthController(AuthService serv) {
		this.serv=serv;
	}
	
	//Register method 
	@PostMapping("/register")
	public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid RegisterRequestDTO request ){
		AuthResponseDTO authDTO = serv.register(request);
		return new  ResponseEntity<>(authDTO , HttpStatus.CREATED);
	}
	
	//login method 
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDTO> Login(@RequestBody @Valid LoginRequestDTO request , HttpSession session  ){
		AuthResponseDTO authDTO = serv.login(request, session);
		return ResponseEntity.ok(authDTO);
	}
	
	//logout method
		@PostMapping("/logout")
		public ResponseEntity<String> logout( HttpSession session  ){
			serv.logout( session);
			return ResponseEntity.ok("Logged out Successfully !");
		}
		
	//post current user method
		@GetMapping("/me")
		public ResponseEntity<AuthResponseDTO> getCurrentUser( HttpSession session  ){
			AuthResponseDTO authDTO = serv.getCurrentUser(session);
			return ResponseEntity.ok(authDTO);
		}
	
	
}

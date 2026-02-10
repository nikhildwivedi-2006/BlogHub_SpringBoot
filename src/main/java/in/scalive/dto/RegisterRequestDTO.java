package in.scalive.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
	@NotBlank(message="Name is required :")
	private String name;
	
	@NotBlank(message="Emial is required :")
	@Email(message="Email format Should be valid ")
	private String email;

	@NotBlank(message="Password is required :")
	@Size(min=6, message="Password must be atleast 6 characters long")
	private String password;
	
	@NotBlank(message="About is required :")
	private String about;  

}

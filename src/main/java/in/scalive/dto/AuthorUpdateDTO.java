package in.scalive.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthorUpdateDTO {
	@Size(min=1,message="Ename Required")
	private String name;
	
	@Size(message="email should be valid")
	private String email;
	
	@Size(min=1 , message="About Required ")
	private String about;
	
}

package in.scalive.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostRequestDTO {
	
	@NotBlank(message="Title is required")
	private String title;
	
	@NotBlank(message="Content is required")
	private String content ;
	
	@NotNull(message="categoryId  is required")
	private Long categoryId;
	
	private Long authorId;
}

package in.scalive.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryRequestDTO {
	@NotBlank(message = "category name is required")
	private String catName;
	@NotBlank(message="Category Description is required")
	private String descr;
}

package in.scalive.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryResponseDTO {
	
	private Long id;
	private String catName;
	private String description;
}


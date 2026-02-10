package in.scalive.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostUpdateDTO {

	private String title;
	private String content;
	private Long categoryId;
	private Long authorId;
}

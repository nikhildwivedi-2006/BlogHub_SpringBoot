package in.scalive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.scalive.entity.Author;
import in.scalive.entity.Post;

public interface PostRepository extends JpaRepository<Post ,Long> {
   List <Post> findByAuthor(Author author);
   List <Post> findByTitleContainingOrContentContaining(String title , String content);
}

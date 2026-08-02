package com.internvision.portal.repository;

import com.internvision.portal.firebase.FirestoreService;
import com.internvision.portal.model.Course;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CourseRepository {

    private static final String COLLECTION_NAME = "courses";
    private final FirestoreService firestoreService;

    public String save(Course course) {
        return firestoreService.save(COLLECTION_NAME, course.getId(), course);
    }

    public Optional<Course> findById(String id) {
        return firestoreService.findById(COLLECTION_NAME, id, Course.class);
    }

    public Optional<Course> findFeaturedCourse() {
        List<Course> activeCourses = firestoreService.findByField(COLLECTION_NAME, "isActive", true, Course.class);
        if (!activeCourses.isEmpty()) {
            return Optional.of(activeCourses.get(0));
        }
        List<Course> all = firestoreService.findAll(COLLECTION_NAME, Course.class);
        return all.stream().findFirst();
    }

    public List<Course> findAll() {
        return firestoreService.findAll(COLLECTION_NAME, Course.class);
    }
}

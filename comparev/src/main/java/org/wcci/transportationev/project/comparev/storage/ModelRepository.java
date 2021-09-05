package org.wcci.transportationev.project.comparev.storage;

import org.springframework.data.repository.CrudRepository;
import org.wcci.transportationev.project.comparev.resources.Model;

public interface ModelRepository extends CrudRepository<Model, Long> {
    
}
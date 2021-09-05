package org.wcci.transportationev.project.comparev.storage;

import org.springframework.stereotype.Service;
import org.wcci.transportationev.project.comparev.resources.Make;

@Service
public class MakeStorage {

    private MakeRepository makeRepo;

    public MakeStorage(MakeRepository makeRepo) {
        this.makeRepo = makeRepo;
    }

    public Iterable<Make> retrieveAllMakes() {
        return makeRepo.findAll();
    }

    public Make retrieveMakeById(Long id) {
        return makeRepo.findById(id).get();
    }

    public void saveMake(Make makeToSave) {
        makeRepo.save(makeToSave);
    }
}
package org.wcci.transportationev.project.comparev.storage;

import org.springframework.stereotype.Service;
import org.wcci.transportationev.project.comparev.resources.Year;

@Service
public class YearStorage {

    private YearRepository yearRepo;

    public YearStorage(YearRepository yearRepo) {
        this.yearRepo = yearRepo;
    }

    public Iterable<Year> retrieveAllYears() {
        return yearRepo.findAll();
    }

    public Year retrieveYearById(Long id) {
        return yearRepo.findById(id).get();
    }

    public void saveYear(Year yearToSave) {
        yearRepo.save(yearToSave);
    }

    public Year retrieveMakesByYear(int year) {
        return yearRepo.findByYear(year);
    }   
}
package com.makrin.eatwell.domain;

import com.makrin.eatwell.domain.enumeration.Gender;
import com.makrin.eatwell.domain.enumeration.Lifestyle;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UserProperties.
 */
@Entity
@Table(name = "user_properties")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserProperties implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Column(name = "current_weight", nullable = false)
    private Double currentWeight;

    @NotNull
    @Column(name = "preferred_weight", nullable = false)
    private Double preferredWeight;

    @NotNull
    @Column(name = "height", nullable = false)
    private Double height;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "lifestyle", nullable = false)
    private Lifestyle lifestyle;

    @NotNull
    @Column(name = "calories_needed", nullable = false)
    private Double caloriesNeeded;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private ZonedDateTime createdDate;

    @NotNull
    @Column(name = "last_modified_date", nullable = false)
    private ZonedDateTime lastModifiedDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserProperties id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public UserProperties name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Gender getGender() {
        return this.gender;
    }

    public UserProperties gender(Gender gender) {
        this.setGender(gender);
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public UserProperties date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getCurrentWeight() {
        return this.currentWeight;
    }

    public UserProperties currentWeight(Double currentWeight) {
        this.setCurrentWeight(currentWeight);
        return this;
    }

    public void setCurrentWeight(Double currentWeight) {
        this.currentWeight = currentWeight;
    }

    public Double getPreferredWeight() {
        return this.preferredWeight;
    }

    public UserProperties preferredWeight(Double preferredWeight) {
        this.setPreferredWeight(preferredWeight);
        return this;
    }

    public void setPreferredWeight(Double preferredWeight) {
        this.preferredWeight = preferredWeight;
    }

    public Double getHeight() {
        return this.height;
    }

    public UserProperties height(Double height) {
        this.setHeight(height);
        return this;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Lifestyle getLifestyle() {
        return this.lifestyle;
    }

    public UserProperties lifestyle(Lifestyle lifestyle) {
        this.setLifestyle(lifestyle);
        return this;
    }

    public void setLifestyle(Lifestyle lifestyle) {
        this.lifestyle = lifestyle;
    }

    public Double getCaloriesNeeded() {
        return this.caloriesNeeded;
    }

    public UserProperties caloriesNeeded(Double caloriesNeeded) {
        this.setCaloriesNeeded(caloriesNeeded);
        return this;
    }

    public void setCaloriesNeeded(Double caloriesNeeded) {
        this.caloriesNeeded = caloriesNeeded;
    }

    public ZonedDateTime getCreatedDate() {
        return this.createdDate;
    }

    public UserProperties createdDate(ZonedDateTime createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public ZonedDateTime getLastModifiedDate() {
        return this.lastModifiedDate;
    }

    public UserProperties lastModifiedDate(ZonedDateTime lastModifiedDate) {
        this.setLastModifiedDate(lastModifiedDate);
        return this;
    }

    public void setLastModifiedDate(ZonedDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserProperties user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProperties)) {
            return false;
        }
        return getId() != null && getId().equals(((UserProperties) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProperties{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", gender='" + getGender() + "'" +
            ", date='" + getDate() + "'" +
            ", currentWeight=" + getCurrentWeight() +
            ", preferredWeight=" + getPreferredWeight() +
            ", height=" + getHeight() +
            ", lifestyle='" + getLifestyle() + "'" +
            ", caloriesNeeded=" + getCaloriesNeeded() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}

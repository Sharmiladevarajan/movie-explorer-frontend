# Cast & Language Editing Guide

## 🎭 Cast Management

### Adding Cast Members (New Movie)
1. Fill in the basic movie information (title, director, year, genre)
2. Scroll to the "Cast Members" section
3. Click "➕ Add Cast Member"
4. Enter the actor's name and their role/character
5. Repeat for additional cast members
6. Click "✓ Add Movie"

### Editing Cast Members (Existing Movie)
1. Click the edit button on a movie card
2. The form will pre-populate with existing cast members
3. Modify actor names or roles as needed
4. Remove cast members using the 🗑️ button
5. Add new cast members using "➕ Add Cast Member"
6. Click "✓ Update Movie"

### Cast Input Format
Each cast member has two fields:
- **Actor Name**: The actor's full name (e.g., "Leonardo DiCaprio")
- **Role/Character**: The character they played (e.g., "Jack Dawson")

### Example
```
Actor Name: Tom Hanks
Role: Forrest Gump

Actor Name: Robin Wright
Role: Jenny Curran

Actor Name: Gary Sinise
Role: Lieutenant Dan
```

## 🌐 Language Selection

### Supported Languages
The system supports 12 major languages:
- English
- Spanish
- French
- German
- Italian
- Japanese
- Korean
- Chinese
- Hindi
- Arabic
- Russian
- Portuguese

### Setting Language
1. In the movie form, find the "Language" dropdown
2. Select the primary language of the film
3. The default is "English"
4. Save the movie

## 🔄 How It Works Behind the Scenes

### Actor Creation
When you add a cast member:
1. The system checks if the actor already exists in the database
2. If not, a new actor record is created automatically
3. The actor-movie relationship is established with the role
4. You don't need to create actors separately!

### Actor Linking
- Actors are identified by name
- If you type "Tom Hanks" in multiple movies, it links to the same actor
- Actor profiles will show all their movies
- Roles are specific to each movie

### Data Structure
The cast is sent to the backend as:
```json
{
  "cast": [
    {"actor_name": "Actor 1", "role": "Character 1"},
    {"actor_name": "Actor 2", "role": "Character 2"}
  ]
}
```

## ✅ Best Practices

### Naming Conventions
- Use full names: "Robert Downey Jr." not "RDJ"
- Be consistent: Always use the same name for the same actor
- Include suffixes: "Jr.", "Sr.", "III" if applicable

### Role Descriptions
- Use character names: "Tony Stark" not "Iron Man suit guy"
- Be specific: "Young Tony Stark" vs "Tony Stark"
- For documentaries: "Narrator", "Themselves", "Host"

### Language Selection
- Choose the original language of the film
- For multilingual films, choose the primary language
- For dubbed films, still select the original language

## 🎬 Examples

### Example 1: Adding Inception
```
Title: Inception
Director: Christopher Nolan
Year: 2010
Genre: Sci-Fi
Language: English

Cast:
- Leonardo DiCaprio → Dom Cobb
- Tom Hardy → Eames
- Ellen Page → Ariadne
- Marion Cotillard → Mal
```

### Example 2: Adding Parasite
```
Title: Parasite
Director: Bong Joon-ho
Year: 2019
Genre: Thriller
Language: Korean

Cast:
- Song Kang-ho → Kim Ki-taek
- Lee Sun-kyun → Park Dong-ik
- Cho Yeo-jeong → Choi Yeon-kyo
```

### Example 3: Editing Cast
**Before:**
- Actor: Tom Hanks, Role: Unknown

**After:**
- Actor: Tom Hanks, Role: Chuck Noland
- Actor: Helen Hunt, Role: Kelly Frears (Added)

## 🚀 Advanced Features

### Bulk Cast Entry
For movies with large casts:
1. Click "➕ Add Cast Member" multiple times to create empty rows
2. Fill them in one by one
3. Remove any extras with the 🗑️ button

### Reordering
Cast members appear in the order you add them. To reorder:
1. Note the order you want
2. Remove all cast members
3. Re-add them in the desired order

### Removing Cast
- Click the 🗑️ button next to any cast member
- The removal is instant in the form
- Changes are saved when you click "Update Movie"

## ⚠️ Common Issues

### Issue: Actor appears twice in profile
**Cause**: Used different name variations (e.g., "Bob Smith" vs "Robert Smith")
**Solution**: Pick one name format and use it consistently

### Issue: Role field is empty
**Cause**: Forgot to fill in the role when adding cast
**Solution**: Edit the movie and add the role information

### Issue: Cast not showing up
**Cause**: Didn't save the movie after adding cast
**Solution**: Always click "✓ Add Movie" or "✓ Update Movie"

### Issue: Can't delete all cast members
**Cause**: Cast is optional, you can have zero cast members
**Solution**: Just delete all and save - it's fine!

## 🔍 Viewing Cast Information

### On Movie Cards
- Hover over a movie card
- Click to view full details
- Cast list appears with roles

### On Actor Profiles
- Navigate to `/actors/{id}/profile`
- See all movies they've been in
- See the roles they played

### On Director Profiles
- Navigate to `/directors/{id}/profile`
- See all their movies
- See the cast of each movie

## 📊 Database Schema

### movie_actors Table
```sql
CREATE TABLE movie_actors (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id),
    actor_id INTEGER REFERENCES actors(id),
    role VARCHAR(200)
);
```

### Language Column
```sql
ALTER TABLE movies ADD COLUMN language VARCHAR(50) DEFAULT 'English';
```

## 🎯 Tips for Better Data Quality

1. **Research before adding**: Look up the correct spelling of names
2. **Use IMDb format**: Follow IMDb naming conventions
3. **Complete cast lists**: Add all major cast members
4. **Meaningful roles**: Use actual character names, not generic terms
5. **Original language**: Always select the film's original language

## 🔗 Related Features

- **Actor Profiles**: Automatically updated when you add cast
- **Search by Actor**: Use the filter to find movies by actor
- **Director Profiles**: Shows all cast for their movies
- **Reviews**: Can mention cast members in review text

## 📝 Technical Notes

### API Endpoint
```
POST/PUT /api/movies
Content-Type: application/json

{
  "title": "Movie Name",
  "director_name": "Director Name",
  "release_year": 2024,
  "genre_name": "Genre",
  "language": "English",
  "cast": [
    {"actor_name": "Actor Name", "role": "Character Name"}
  ]
}
```

### Response
```json
{
  "id": 1,
  "title": "Movie Name",
  "cast": [
    {
      "id": 1,
      "name": "Actor Name",
      "role": "Character Name"
    }
  ]
}
```

## 🎉 Quick Start Checklist

- [ ] Open movie form (Add or Edit)
- [ ] Fill in basic movie info
- [ ] Select language from dropdown
- [ ] Click "➕ Add Cast Member"
- [ ] Enter actor name
- [ ] Enter role/character
- [ ] Repeat for more cast
- [ ] Click Save
- [ ] View your movie with full cast!

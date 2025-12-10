# SPWrite Research - Dearborn Speedwriting System

## Legal Status: SAFE TO USE ✅

**KEY FINDING:** In 1931, the Second Circuit Court of Appeals ruled that shorthand systems themselves **cannot be copyrighted** - only the specific instructional materials. The system/rules are an invention/process, not a literary work.

**This means:** We can freely implement Dearborn's rules in our app without copyright concerns. We just can't copy the original textbook verbatim.

**Source:** 1937 edition available on Internet Archive: https://archive.org/details/speedwritingnatu00dear

---

## System Overview

**Created by:** Emma B. Dearborn (1875-1937)
**Launched:** 1924
**Design principle:** Uses only standard alphabet letters + a few punctuation marks
**Typeable:** YES - designed for both pen and typewriter (QWERTY keyboard)

---

## Core Rules (Dearborn System)

### 1. Vowel Omission
- **Write words as they sound**
- **Omit short vowels**, especially in unstressed syllables
- **Keep long vowels** when they're pronounced

**Examples:**
- "important" → "imprtnt"
- "little" → "ltl"
- "make" → "mk"
- "sell" → "sel"
- "road" → "rd"
- "boat" → "bt"

### 2. Keep Long Vowels (for clarity)
- "file" → "fil" (keep the 'i' because it's long)
- "leap" → "lep" (keep the 'e')
- "dial" → "dil"

### 3. Common Word Abbreviations (Arbitrary)
These are the most frequent words with special shortened forms:

| English | Speedwriting | Notes |
|---------|--------------|-------|
| you | u | |
| your | ur | |
| the | . | (period/dot) |
| and | & | (ampersand) |
| of | f | |
| to | 2 | (numeral) |
| with | w/ | |
| without | w/o | |
| before | bf | |
| because | bc | |

### 4. Prefix/Suffix Abbreviations
- **Uppercase N** = "enter-" or "inter-"
  - "entertainment" → "Ntn-"
  - "interrogation" → "Ngj"
- More prefixes/suffixes exist but need further research

### 5. Silent Letter Removal
- Remove silent letters along with unstressed vowels
- Examples needed (research further)

---

## Example Sentence

**English:**
"Let us have a quiet little party and surprise our neighbor on the farm"

**Speedwriting:**
"ltus vaqt ll p/, aspz rNb otfm"

(Translation breakdown: lt=let, us=us, va=have, qt=quiet, ll=little, p/=party, &=and, s=surprise, r=our, Nb=neighbor, o=on, t=the, f=farm)

---

## Implementation Notes for SPWrite

### Start Simple
1. Begin with ~100 most common words
2. Focus on journaling vocabulary (emotions, daily activities, reflections)
3. Implement basic vowel omission first
4. Add special abbreviations incrementally

### Rule Complexity
- Some rules will conflict (when to keep vs. omit a vowel?)
- **KISS approach:** Start with deterministic rules
- For ambiguous cases, pick one consistent interpretation
- Document decisions for consistency

### Data Structure Considerations
- Need bidirectional lookup (English ↔ Speedwriting)
- Some speedwriting abbreviations are ambiguous (one speedwriting form = multiple English words?)
- May need to handle multiple valid translations

---

## Starter Word List for Journaling (100 words)

### Personal Pronouns & Common Words (20)
| English | Speedwriting | Rule Applied |
|---------|--------------|--------------|
| I | I | (keep as-is, single letter) |
| you | u | (common abbreviation) |
| me | me | (keep long 'e') |
| my | my | (keep long 'y') |
| we | we | (keep long 'e') |
| us | us | (keep as-is) |
| he | he | (keep long 'e') |
| she | she | (keep long 'e') |
| they | .y | (. for "the" + y) |
| the | . | (common abbreviation) |
| a | a | (keep as-is) |
| and | & | (common abbreviation) |
| to | 2 | (common abbreviation) |
| of | f | (common abbreviation) |
| with | w/ | (common abbreviation) |
| for | fr | (omit 'o') |
| in | n | (omit 'i') |
| on | on | (keep as-is) |
| at | at | (keep as-is) |
| is | s | (omit 'i') |

### Emotions & Feelings (20)
| English | Speedwriting | Rule Applied |
|---------|--------------|--------------|
| feel | fel | (keep long 'e', omit second 'e') |
| happy | hpy | (omit 'a', keep long 'y') |
| sad | sd | (omit 'a') |
| angry | ngry | (omit 'a') |
| worried | wrd | (omit vowels) |
| anxious | nxs | (omit vowels) |
| calm | clm | (omit 'a') |
| peaceful | pcefl | (omit 'a', 'e', 'u') |
| grateful | grtfl | (omit 'a', 'e') |
| tired | trd | (omit 'i', 'e') |
| energetic | nrjtc | (omit 'e', 'e', 'i') |
| stressed | strsd | (omit 'e', 'e') |
| content | cntnt | (omit 'o', 'e') |
| frustrated | frstrtd | (omit 'u', 'a', 'e') |
| hopeful | hpfl | (omit 'o', 'e', 'u') |
| excited | xctd | (omit 'e', 'i', 'e') |
| confused | cnfzd | (omit 'o', 'u', 'e') |
| overwhelmed | vrwlmd | (omit 'o', 'e', 'h', 'e', 'e') |
| proud | prd | (omit 'o', 'u') |
| ashamed | shmd | (omit 'a', 'a', 'e') |

### Time & Daily Activities (20)
| English | Speedwriting | Rule Applied |
|---------|--------------|--------------|
| today | 2dy | ('2' for 'to', omit 'a') |
| yesterday | ystdy | (omit 'e', 'e', 'a') |
| tomorrow | 2mrw | ('2' for 'to', omit vowels) |
| morning | mrng | (omit 'o', 'i') |
| afternoon | ftrnn | (omit 'a', 'e', 'o', 'o') |
| evening | vng | (omit 'e', 'e', 'i') |
| night | ngt | (omit 'i') |
| week | wk | (omit 'ee') |
| month | mnth | (omit 'o') |
| year | yr | (omit 'ea') |
| work | wrk | (omit 'o') |
| home | hm | (omit 'o', 'e') |
| sleep | slp | (keep long 'ee' → 'e', omit second 'e') |
| wake | wk | (keep long 'a', omit 'e') |
| eat | et | (keep long 'ea' → 'e') |
| cook | ck | (omit 'oo') |
| read | rd | (keep long 'ea' → 'e') |
| write | rt | (omit 'i', 'e') |
| walk | wlk | (omit 'a') |
| exercise | xrcs | (omit 'e', 'e', 'i', 'e') |

### Thoughts & Reflection (20)
| English | Speedwriting | Rule Applied |
|---------|--------------|--------------|
| think | thnk | (omit 'i') |
| thought | tht | (omit 'o', 'u', 'g') |
| idea | ida | (keep long 'i', omit 'e') |
| remember | rmmber | (omit 'e', 'e') |
| forget | frgt | (omit 'o', 'e') |
| decide | dcde | (omit 'e', 'i') |
| choice | chc | (omit 'o', 'i', 'e') |
| believe | blve | (omit 'i', keep long 'e', omit second 'e') |
| doubt | dbt | (omit 'o', 'u') |
| understand | ndrst& | (omit vowels, '&' for 'and') |
| confuse | cnfz | (omit 'o', 'u', 'e') |
| realize | rlze | (keep long 'i' → 'e', omit 'a') |
| hope | hp | (keep long 'o' → 'o', omit 'e') |
| wish | wsh | (omit 'i') |
| want | wnt | (omit 'a') |
| need | nd | (keep long 'ee' → 'e') |
| try | try | (keep long 'y') |
| learn | lrn | (omit 'ea') |
| grow | grw | (omit 'o') |
| change | chng | (omit 'a', 'e') |

### Relationships & People (20)
| English | Speedwriting | Rule Applied |
|---------|--------------|--------------|
| friend | frnd | (omit 'i', 'e') |
| family | fmly | (omit 'a', 'i') |
| partner | prtnr | (omit 'a', 'e') |
| love | lv | (keep long 'o', omit 'e') |
| like | lk | (keep long 'i', omit 'e') |
| care | cr | (keep long 'a', omit 'e') |
| help | hlp | (omit 'e') |
| support | sprt | (omit 'u', 'o') |
| listen | lstn | (omit 'i', 'e') |
| talk | tlk | (omit 'a') |
| speak | spk | (keep long 'ea' → 'e') |
| say | sy | (keep long 'a') |
| tell | tll | (omit 'e') |
| call | cll | (omit 'a') |
| meet | mt | (keep long 'ee' → 'e') |
| visit | vst | (omit 'i', 'i') |
| share | shr | (keep long 'a', omit 'e') |
| thank | thnk | (omit 'a') |
| sorry | sry | (omit 'o') |
| forgive | frgv | (omit 'o', 'i', 'e') |

---

## Questions & Ambiguities to Resolve

1. **Long vs. short vowel distinction:** How to algorithmically determine which vowels to keep?
   - May need a pronunciation dictionary or hardcode common patterns
   - For MVP: Use the word list above as reference, don't auto-generate

2. **Pronunciation vs. spelling:** "file" has silent 'e' but long 'i' sound
   - Keep the 'i' in "fil" because it's pronounced
   - This requires phonetic knowledge

3. **Bidirectional ambiguity:** Does "rd" = "read" or "road" or "red"?
   - Context-dependent in real shorthand
   - For MVP: Pick most common word, or show multiple options

4. **Special characters on mobile:** Can we use '.' and '&' easily on mobile keyboard?
   - May want to offer both: strict mode (., &) vs. alpha-only mode (t, and)

---

## Next Steps

1. ✅ Research complete - we have enough to build MVP
2. ⏳ Refine this word list (remove duplicates, verify speedwriting forms)
3. ⏳ Design JSON data structure
4. ⏳ Design UI mockup
5. Build the app!

---

## Sources

- [Speedwriting - Wikipedia](https://en.wikipedia.org/wiki/Speedwriting)
- [Speedwriting (Emma Dearborn) - Art of Memory](https://artofmemory.com/wiki/Speedwriting_(Emma_Dearborn)/)
- [Speedwriting, the natural shorthand - Internet Archive](https://archive.org/details/speedwritingnatu00dear)
- [Speedwriting - Britannica](https://www.britannica.com/topic/Speedwriting)
- [Speedwriting - Curiosity](https://www.curaorg.uk/speedwriting/speedwriting/)
- [Speed-Writing - UoPeople](https://www.uopeople.edu/blog/speed-writing-how-to-write-shorthand/)
- [How to take notes faster with speedwriting](https://www.businessmanagementdaily.com/62581/how-to-take-notes-faster-with-speedwriting/)

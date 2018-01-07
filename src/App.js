import React, { Component } from 'react';
import Tone from 'tone';
import './App.css';

const synth = new Tone.PolySynth(1, Tone.Synth).toMaster();
const polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

class App extends Component {
  constructor(props) {
    super(props);
    const firstNotes = ['A', 'B', 'C', 'D', 'E', 'G'];
    this.state = {
      chord: [],
      chords: [],
      notes: firstNotes.map((note, ind) => ({
        key: note,
        accidental: '',
        sharp: false,
        flat: false,
        octave: ind > 1 ? 4 : 3,
      })),
    };
    this.mouseD = this.mouseD.bind(this);
    this.mouseU = this.mouseU.bind(this);
    this.chordDown = this.chordDown.bind(this);
    this.chordUp = this.chordUp.bind(this);
    this.noteSharp = this.noteSharp.bind(this);
    this.noteFlat = this.noteFlat.bind(this);
    this.octaveChange = this.octaveChange.bind(this);
  }

  mouseD(event) {
    const stateCopy = Object.assign({}, this.state);
    const { notes } = this.state;
    const { id } = event.target;
    const note = notes[id].key + notes[id].accidental + notes[id].octave;
    synth.triggerAttack(note);
    stateCopy.chord.push(note);
    this.setState(stateCopy);
  }

  mouseU(event) {
    const { notes } = this.state;
    const { id } = event.target;
    const note = notes[id].key + notes[id].accidental + notes[id].octave;
    synth.triggerRelease(note);
  }

  chordDown(event) {
    const id = Number(event.target.id);
    const chord = this.state.chords[id];
    polySynth.triggerAttack(chord);
  }

  chordUp(event) {
    const id = Number(event.target.id);
    const chord = this.state.chords[id];
    polySynth.triggerRelease(chord);
  }

  noteSharp(event) {
    const { id } = event.target;
    const originalNotes = this.state.notes;
    const stateCopy = Object.assign({}, this.state);
    const currentNote = stateCopy.notes[id];
    if (originalNotes[id].sharp === false) {
      currentNote.sharp = true;
      currentNote.flat = false;
      currentNote.accidental = '#';
      stateCopy.notes[id].newNote = `${currentNote.key}#${currentNote.octave}`;
    } else {
      currentNote.sharp = false;
      currentNote.flat = false;
      currentNote.accidental = '';
      stateCopy.notes[id].newNote = currentNote.key + currentNote.octave;
    }
    this.setState(stateCopy);
  }

  noteFlat(event) {
    const { id } = event.target;
    const originalNotes = this.state.notes;
    const stateCopy = Object.assign({}, this.state);
    const currentNote = stateCopy.notes[id];
    if (originalNotes[id].flat === false) {
      currentNote.sharp = false;
      currentNote.flat = true;
      currentNote.accidental = 'b';
      stateCopy.notes[id].newNote = `${currentNote.key}#${currentNote.octave}`;
    } else {
      currentNote.sharp = false;
      currentNote.flat = false;
      currentNote.accidental = '';
      stateCopy.notes[id].newNote = currentNote.key + currentNote.octave;
    }
    this.setState(stateCopy);
  }

  octaveChange(event) {
    const { id } = event.target;
    const { value } = event.target;
    const stateCopy = Object.assign({}, this.state);
    const currentNote = stateCopy.notes[id];
    currentNote.octave = Number(value);
    this.setState(stateCopy);
  }

  render() {
    return (
      <div className="App">
        {
          this.state.notes.map((note, ind) => (
            <div key={note.key} className="note-selection">

              <div>
                <div
                  onMouseDown={this.mouseD}
                  onMouseUp={this.mouseU}
                  id={ind}
                  className="center-flake"
                >
                  <p id={ind}>{note.key + note.accidental + note.octave}</p>
                </div>

                <div className="note-buttons">
                  <button className="accidental-buttons" onClick={this.noteSharp} id={ind} name="#">#</button>
                  <button className="accidental-buttons" onClick={this.noteFlat} id={ind} name="b">b</button>
                  <select onChange={this.octaveChange} id={ind}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                  </select>
                </div>
              </div>

            </div>
              ))
        }
      </div>
    );
  }
}

export default App;

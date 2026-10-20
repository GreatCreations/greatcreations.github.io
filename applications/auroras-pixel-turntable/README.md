# Aurora's pixel turntable

A local sound-image player and audio-to-PNG converter.

**Open the app:** https://studios.greatcreations.art/applications/auroras-pixel-turntable/

The player opens with a default sound-image loaded and paused: **aurora-loud-noise-pixels.png**, encoded from the bundled **aurora-loud-noise.mp3** sample - 58 seconds of loud generated howls, bangs and clangs. Nothing plays until you press a direction button. Start with your speakers low.

## Bundled default sample

- `aurora-loud-noise.mp3` - the 58.0-second generated noise performance that is the source audio.
- `aurora-loud-noise-pixels.png` - the same audio encoded as a 1,600 x 1,599 sound-image (44.1 kHz mono). The app loads it automatically on open, paused at the start.

Opening the image picker or converter and loading your own file replaces the default for that visit.

## Quick start

1. Choose **Open image**, or drop a PNG or JPEG sound-image into the loading area.
2. Press **To end** to play forward, or **To start** to play backward.
3. Use **Pause** to stop and **Loop** to wrap at the ends.
4. Scratch with the record, magnifying glass or position bar.

At an endpoint, pressing the same direction button starts from the opposite endpoint. Switching away from the page pauses playback.

## Convert audio into a sound-image

Open **Convert audio to an image**, choose an audio clip, select an audio channel, then press **Make PNG + load**. The PNG loads into the player. Use **Download PNG** to keep it.

- WAV and MP3 are supported by current Chrome; other formats depend on the browser's audio decoder.
- Maximum input: 60 seconds and 20 MB.
- Audio channel choices: mix to mono, left channel or right channel.
- Output: 44,100 samples per second, mono, up to 1,600 pixels wide.
- The last row is padded with silence when needed. The converter reports the padding duration.
- Pixel encoding loses audio detail. Keep the original audio file.

Conversion happens in your browser, not on a server.

## Speeds

There are 17 speeds: eight slower, Normal and eight faster.

| Slower | Normal | Faster |
| --- | --- | --- |
| 0.044× | 1× | 1.25× |
| 0.066× | | 1.5× |
| 0.099× | | 1.75× |
| 0.148× | | 2× |
| 0.222× | | 2.25× |
| 0.333× | | 2.5× |
| 0.5× | | 2.75× |
| 0.75× | | 3× |

Displayed slower rates are rounded. Rates below 0.5× use successive two-thirds ratios. All speeds are positive; direction is a separate control.

Tap a speed, or hold a finger down and slide across the speed buttons, to change speed immediately without stopping or restarting playback. The current position and forward/backward direction are preserved. Releasing or canceling a speed gesture does not pause a playing track. On narrow screens, hold near an edge to reach more speeds without lifting. Normal starts in the center of the strip.

The record rotation follows the same playhead as the time bar and magnifying glass, including while scratching a paused track.

## Scratch and hold controls

- **Record:** turn clockwise to move forward or counterclockwise to move backward. Movement changes speed and pitch. Releasing stops a paused scratch or resumes the previous playback direction.
- **Magnifying glass:** drag left or right to scratch on its current image row. The row stays locked until release.
- **Position bar:** drag to scratch anywhere in the track, forward or backward. Releasing restores the previous playback state.
- **Hold buttons:** tap to nudge 0.1 seconds, or hold for directional playback. Release to return to the previous playback state.
- **Keyboard:** focus the record and use arrow keys to seek by 0.05 seconds, or Home and End to jump to an endpoint. The magnifier also supports arrow keys within its row.

## Sound-image format

Each pixel is one audio sample, scanned left to right and top to bottom.

```text
sample = ((R + G + B) / 768 - 0.5) * 2
```

The sample rate is 44,100 Hz, mono. Alpha is not an audio channel. Original dimensions are preserved for decoding; display scaling does not change the audio.

PNG is lossless. JPEG is accepted with a warning because compression changes the sound. Images decode as received, with no repair or resampling. Image limits: 12 million pixels and 32 MB.

An ordinary photograph produces pixel-derived sound. This is not photo-to-speech or speech recognition. The only bundled media is this generated noise sample. No private media ships with the app.

## Privacy

Selected images and audio are processed locally in the browser. The app does not upload them, use analytics or load external scripts or fonts. Visiting the hosted page still requests the page itself from its web host. Selected files are not retained after the page closes.

## Touch gestures

The page suppresses context menus, text selection, image dragging and supported touch callouts to keep them from interrupting the instrument. Browser and operating-system controls outside the page cannot be disabled.

Scratch controls, hold buttons and the speed strip capture their gestures. Normal page scrolling remains available outside those controls. Canceled touches release active gestures without pausing latched playback. A focus-only blur also releases gestures without pausing; actually hiding or leaving the page pauses sound. Extra simultaneous fingers do not start competing gestures.

## Browser support

Use a current browser with Web Audio and local file support. The app is a self-contained HTML page. A downloaded copy can run without installation or an account, but some phone file viewers display HTML source instead of running it. The hosted app is the simplest way to open it on a phone.

Mobile layout and interactions have been checked in browser emulation. Physical-phone file download and playback have not yet been verified.

## Compact phone layout

The compact layout puts the converter launcher on the left and the image-loading area on the right in one top row. Converter options open over the player instead of pushing it down. The image display adjusts to the available phone height while touch controls keep their current size.

Updated October 20, 2026.

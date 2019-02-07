define([
    "skylark-langx/langx",
    "skylark-utils-dom/eventer",
    "skylark-utils-imagex",
    'skylark-jquery',
    "../fileupload-ui"
],function (langx,eventer,imagex,$) {
    'use strict';

    // Prepend to the default processQueue:
    $.blueimp.fileuploadui.prototype.options.processQueue.unshift(
        {
            action: 'loadAudio',
            // Use the action as prefix for the "@" options:
            prefix: true,
            fileTypes: '@',
            maxFileSize: '@',
            disabled: '@disableAudioPreview'
        },
        {
            action: 'setAudio',
            name: '@audioPreviewName',
            disabled: '@disableAudioPreview'
        }
    );

    // The File Upload Audio Preview plugin extends the fileupload widget
    // with audio preview functionality:
    $.widget('blueimp.fileuploadui', $.blueimp.fileuploadui, {

        options: {
            // The regular expression for the types of audio files to load,
            // matched against the file type:
            loadAudioFileTypes: /^audio\/.*$/
        },

        _audioElement: document.createElement('audio'),

        processActions: {

            // Loads the audio file given via data.files and data.index
            // as audio element if the browser supports playing it.
            // Accepts the options fileTypes (regular expression)
            // and maxFileSize (integer) to limit the files to load:
            loadAudio: function (data, options) {
                if (options.disabled) {
                    return data;
                }
                var file = data.files[data.index],
                    url,
                    audio;
                if (this._audioElement.canPlayType &&
                        this._audioElement.canPlayType(file.type) &&
                        ($.type(options.maxFileSize) !== 'number' ||
                            file.size <= options.maxFileSize) &&
                        (!options.fileTypes ||
                            options.fileTypes.test(file.type))) {
                    url = imagex.createObjectURL(file);
                    if (url) {
                        audio = this._audioElement.cloneNode(false);
                        audio.src = url;
                        audio.controls = true;
                        data.audio = audio;
                        return data;
                    }
                }
                return data;
            },

            // Sets the audio element as a property of the file object:
            setAudio: function (data, options) {
                if (data.audio && !options.disabled) {
                    data.files[data.index][options.name || 'preview'] = data.audio;
                }
                return data;
            }

        }

    });

    return $;

});

import * as React from 'react';
import uploadcare from 'uploadcare-widget';
import {BaseComponent} from './BaseComponent';
import {action} from 'mobx';

interface UploaderProps {
    onChange: (url: string | null) => void;
    value: string | null;
}

class Uploader extends BaseComponent<UploaderProps> {
    protected uploader: HTMLInputElement | null;
    protected widget: any;

    @action.bound
    onChange(file) {
        if (file) {
            file
                .done(info => {
                    this.props.onChange(info.cdnUrl);
                })
                .fail(console.error)
        }
    }

    componentDidMount() {
        const {value} = this.props;
        const widget = this.widget = uploadcare.Widget(this.uploader);

        widget.value(value);
        widget.onChange(this.onChange);
    }

    componentDidUpdate() {
        this.widget.onChange.remove(this.onChange);
        this.widget.value(this.props.value);
        this.widget.onChange(this.onChange);
    }

    render() {
        return (
            <input
                ref={input => this.uploader = input}
                type="hidden"
                name="content"
                data-image-shrink="200x200 80%"
                data-tabs="file camera"
                data-images-only="true"
                data-preview-step="true"
                data-clearable="false"
                data-multiple="false"
                data-system-dialog="false"
                data-crop="300:300"
            />
        )
    }
}

export default Uploader;

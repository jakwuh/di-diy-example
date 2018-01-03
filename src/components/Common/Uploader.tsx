import * as React from 'react';
import * as uploadcare from 'uploadcare-widget';
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
        this.widget = uploadcare.Widget(this.uploader);

        this.updateWidget(value);
    }

    componentDidUpdate() {
        this.widget.onChange.remove(this.onChange);
        this.updateWidget(this.props.value);
    }

    updateWidget(value) {
        if (value && String(value).indexOf('ucarecdn') > -1) {
            this.widget.value(value);
        }
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

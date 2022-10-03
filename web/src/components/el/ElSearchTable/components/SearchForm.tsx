import React from 'react';
import ElForm, { ElFormProps } from '@/components/el/ElForm';
import { SearchFormOption } from '../index';

interface Props {
  searchFormProps: ElFormProps;
  searchFormOptions?: Array<SearchFormOption>;
  onRef: Function;
  submitForm?: Function;
}
interface State {
  formRef: any;
  formData: any;
}
class SearchForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formRef: null,
      formData: {}
    };
  }
  onRef = (ref) => {
    this.setState(
      {
        formRef: ref
      },
      () => {
        if (this.props.onRef) {
          this.props.onRef(this.state.formRef);
        }
      }
    );
  };
  componentDidMount() {
    this.addEnterEvent();
  }

  initFormData = () => {
    const { searchFormOptions } = this.props;
    const selectedOption = searchFormOptions.find(
      (v) => v.isSelected && !v.isDefault
    );
    return selectedOption && selectedOption.formData
      ? selectedOption.formData
      : {};
  };
  addEnterEvent = () => {
    document
      .getElementById('elSearchForm')
      ?.addEventListener('keydown', (e: any) => {
        if (e.target.outerHTML.indexOf('popup') <= -1)
          if (e.key === 'Enter') {
            e.stopImmediatePropagation();
            const { submitForm } = this.props;
            submitForm && submitForm();
          }
      });
  };
  filterFormItem: (props: ElFormProps) => ElFormProps = (props) => {
    const { searchFormOptions } = this.props;
    const selectedOption = searchFormOptions.find((v) => v.isSelected);
    if (selectedOption) {
      return {
        ...props,
        items: props?.items.filter((v) =>
          selectedOption.include.find((j) => j.value === v.name)
        ) || []
      };
    }
    return props;
  };
  render() {
    return (
      <ElForm
        id='elSearchForm'
        onRef={this.onRef}
        formProps={this.filterFormItem(this.props.searchFormProps)}
        rowClassName='el-searchtable-form'
        data={this.initFormData()}
      />
    );
  }
}
export default SearchForm;

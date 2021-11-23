import { Component,OnInit, ChangeDetectorRef } from '@angular/core';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { SearchCountryField, CountryISO,PhoneNumberFormat } from 'ngx-intl-tel-input';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: true,
    todayBtnTxt: 'Today',
    disableUntil: {
      year: 2017,
      month: 12,
      day: 1
    }
  };
  title = 'DigitalChameleonProject';
   public selDate: IMyDate = {
    year:0 ,
    month:0 ,
    day:0
   };
   details:any = {
    email:"",
    mobileNumber:"",
    password:"",
    confirmPassword:"",
    hobbies:"Travelling",
    address:"",
    gender:"Male",
    annualIncome:"",
    termsAndConditions:false,
    language:"english"
  }
  imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  preferredCountries:any[]=[];
  SearchCountryField:any;
  CountryISO:any;
  PhoneNumberFormat:any;
  separateDialCode = true;
  maxlength = "15";
  annualIncome = "";
  language:string = "english";
constructor(private cd: ChangeDetectorRef,private translate: TranslateService){
  translate.setDefaultLang('english');
}
  ngOnInit(){
    let d: Date = new Date();
    this.selDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.SearchCountryField =  SearchCountryField;
    this.PhoneNumberFormat = PhoneNumberFormat;
    this.CountryISO = CountryISO;
    this.preferredCountries = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  }

  onDateChanged(event: IMyDateModel) {
    // Update value of selDate variable
    this.selDate = event.date;
}

onSubmit(){
  // if(this.customersList.length > 0 ){
  //   let index = this.customersList.findIndex(x=>x.customerId == this.customerDetails.customerId);
  //   index == -1 ? this.customersList.push(this.customerDetails) : this.customersList[index] = this.customerDetails;
  // }
  // else{
  // this.customersList.push(this.customerDetails);
  // }
  // this.resetForm();
  // this.isForm = false;

}

uploadFile(event:any) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.imageUrl = reader.result;
      // this.registrationForm.patchValue({
      //   file: reader.result
      // });
      this.editFile = false;
      this.removeUpload = true;
    }
    // ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();        
  }
}

// Function to remove uploaded file
removeUploadedFile() {
  // let newFileList = Array.from(this.el.nativeElement.files);
  this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  this.editFile = true;
  this.removeUpload = false;
  // this.registrationForm.patchValue({
  //   file: [null]
  // });
}

formatCurrency(value:any) {
  value = value.replace(/₹/, '').replace(/\,/g, '');
  console.log('value ', value);
  if (value && !isNaN(value)) {
    let num: number = value;
    // let temp = new Intl.NumberFormat("en-IN").format(num); //inplace of en-IN you can mention your country's code
    // console.log(temp, ' temp ');
    let result =  new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(Number(num));
    // let result = '₹' + temp;
    this.details['annualIncome'] = result;
    console.log('result ', result);


    // this.myForm.patchValue({amount: result});

    console.log('result->', result, typeof result);
    } 
  }
  useLanguage(language: string) {
    this.translate.use(language);
    this.details={
      email:"",
      mobileNumber:"",
      password:"",
      confirmPassword:"",
      hobbies:"Travelling",
      address:"",
      gender:"Male",
      annualIncome:"",
      termsAndConditions:false,
      language:"english"
    }
  }
}

import { Component, ElementRef, ViewChild,OnInit} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas  from 'html2canvas';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  
  public invoicelist:any = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc4 '},
];
  userid:any;
  @ViewChild('invoice') invoiceElement!: ElementRef;
  log=1;
 
  title = 'angularpdfgenerator';
 
  invoices!:any[]

  constructor(private http:HttpClient) { 
    this.getInvoices()
  }

  ngOnInit(): void {
  }
  
  getInvoices(){
    if(localStorage.getItem('role') == 'Farmer'){
        this.http.get('https://localhost:44346/api/Invoice/farmerInvoices/'+localStorage.getItem('userId')).subscribe((res:any)=>{
          this.invoices = res;
          console.log(this.invoices)
        })
    }
    else if(localStorage.getItem('role') == 'Farmer'){
      this.http.get('https://localhost:44346/api/Invoice/dealerInvoices/'+localStorage.getItem('userId')).subscribe((res:any)=>{
        this.invoices = res;
        console.log(this.invoices)
        
    })
  }}

  public generatePDF(): void {

      html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
        const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
        const fileWidth = 200;
        var pageHeight =300 ;
        const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
        var heightLeft = generatedImageHeight;
        let PDF = new jsPDF('p', 'mm', );
        var position = 0;



        PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, position, fileWidth, generatedImageHeight,);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - generatedImageHeight;
          PDF.addPage();
          PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, position, fileWidth, generatedImageHeight);
          heightLeft -= pageHeight;
        }
        
        PDF.save('Invoice.pdf');
      });
  }
}

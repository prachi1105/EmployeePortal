<aura:application extends="force:slds"  >
      <lightning:layout multipleRows="true">
    <div class="slds-grid slds-wrap">
        <lightning:layoutItem padding="around-small" size="12">
        <c:employee_header ></c:employee_header>
        </lightning:layoutItem>
        <c:employee_nav ></c:employee_nav>
        <c:employee_body ></c:employee_body>
        <c:employee_footer ></c:employee_footer>
    </div>
    </lightning:layout>
</aura:application>
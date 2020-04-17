import { Directive, OnInit, ElementRef, DoCheck } from '@angular/core';

/**
 * @summary reinsert script element for hot injection and execution of
 *          javascript content in Angular components
 */
@Directive({
  selector: '[appRunScript]'
})
export class RunScriptDirective implements OnInit, DoCheck {

  /**
   * @summary last rendered html piece
   */
  private lastLoadedHtml: string;

  /**
   * @summary default constructor
   * @param elementRef element tagged with this directive
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * @summary run scripts from the raw html on creation
   */
  ngOnInit(): void {
    this.reinsertScripts();
  }

  /**
   * @summary on changes, try to reload the scripts
   */
  ngDoCheck(): void {
    this.reinsertScripts();
  }

  /**
   * @summary reinsert html and scripts in an element
   */
  private reinsertScripts(): void {
    // Retrieve the element's content
    const elRefContent = this.elementRef.nativeElement.innerHTML;

    // Check whether the content has been changed or not
    if (this.lastLoadedHtml === elRefContent) {
      return;
    }

    // Update the lastLoadedHtml to its current content
    this.lastLoadedHtml = elRefContent;

    // Retrieve all <script> tags in the raw HTML
    const scripts = this.elementRef.nativeElement
      .getElementsByTagName('script') as HTMLScriptElement[];

      // For each script, recreate it as a DOM element to override Angular sanitizer
    const scriptsInitialLength = scripts.length;
    for (let i = 0; i < scriptsInitialLength; ++i) {
      const script = scripts[i];

      const scriptCopy = document.createElement('script') as HTMLScriptElement;

      if (script.innerHTML) {
        scriptCopy.innerHTML = script.innerHTML;
      } else if (script.src) {
        scriptCopy.src = script.src;
      }

      // Override the current DOM node with the newly created one
      scriptCopy.async = false;
      script.parentNode.replaceChild(scriptCopy, script);
    }
  }

}
